import React, {Component} from "react";
import Main from "../template/Main";
import axios from "axios"

const baseUrl = "https://navarromed.nexfar.com.br/api/status"

const infoState = {
  rand:"",
  list: []
}


export default class Home extends Component {
  rand = ""
  profiles = ""
  port = ""
  ip = ""
  database = ""
  dist=""

  componentDidMount(){
    axios(baseUrl).then(resp => {
        this.setState({list:resp.data})

        this.rand = resp.data["rand"]
        this.profiles = resp.data["profiles"]
        this.port = resp.data["p"]
        this.ip = resp.data["ip"]
        this.database = resp.data["distDb"]
        this.dist = resp.data["dist"]
      })  
}


  render() {
    return(
    <Main icon="home" title="Início" subtitle="">
        <div className="display-4">Status do Sistema</div>
        <table className="table mt-4 table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                      <tr>
                        <th>Rand</th>
                        <th>{this.rand}</th>
                    </tr>
                    <tr>
                        <th>Profile</th>
                        <th>{this.profiles}</th>
                    </tr>
                    <tr>
                        <th>Porta</th>
                        <th>{this.port}</th>
                    </tr>
                    <tr>
                        <th>Ip</th>
                        <th>{this.ip}</th>
                    </tr>
                    <tr>
                        <th>Database</th>
                        <th>{this.database}</th>
                    </tr>
                    <tr>
                        <th>Dist</th>
                        <th>{this.dist}</th>
                    </tr>
                </tbody>
            </table>
          <hr/>
    </Main>
 )}
}