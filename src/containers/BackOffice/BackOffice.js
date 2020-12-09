import React, { Component } from "react";
import UserHeader from "../../components/UserHeader/UserHeader";
import UserPosts from "../../components/UserPosts/UserPosts";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { Link } from "react-router-dom";
import axios from "axios";
// import { DataGrid } from '@material-ui/data-grid';
// import { Button } from '@material-ui/core';
import { CREATE_POST } from "../../constants/action-types";
import AlignItemsList from "./AlignItemsList";

// export const _HOST = "http://localhost:5000"
export const _HOST = "http://social.mobsistema.com.br:5000"

const columns = [
  { field: 'id', headerName: 'id', },
  { field: 'username', headerName: 'username', },
  { field: 'avatar', headerName: 'avatar', },
  { field: 'name', headerName: 'name', },
  { field: 'ativo', headerName: 'ativo', },
];

const sortModel = [
  {
    field: 'username',
    sort: 'asc',
  },
];

axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;

const BackOfficeState = state => {
  return {
    user: state.user.user,
    posts: state.user.posts,
    visible: state.common.visible,
    loading: state.common.loading
  };
};

class BackOffice extends Component {

  state = {
    loading: true,
    users: []
  }

  componentWillMount(){
      axios
        .get(_HOST+"/api/users-all")
        .then(response => {
          let users = []
          if(response.data && response.data.user && response.data.user.length > 0){
            let temp = []
            for(let single of response.data.user){
                temp.push({
                  id: single._id,
                  username: single.username,
                  avatar: single.avatar,
                  name: single.name,
                  ativo: single.checked?"SIM":"NÃO",
                  checked: single.checked
                })
            }
            users = temp
          }
          this.setState({loading: false, users: users})
        })
        .catch(error => {
          console.log(error);
        });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <div className="container">
              <div className="text-center component">
                <h4>Controle de Acessos</h4>
                <p className="lead">
                  Defina os usuários que poderão acessar a plataforma
                </p>
              </div>
            </div>
            <AlignItemsList users={this.state.users} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  BackOfficeState,
  actions
)(BackOffice);
