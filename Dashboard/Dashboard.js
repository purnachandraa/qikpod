import React, { Component } from 'react';
import Axios from 'axios';
import Board from 'react-trello'
class Dashboard extends Component {
    state = {
        data: {
            lanes: []
        }
    }
    componentDidMount() {
        Axios.get('https://api.airtable.com/v0/appmXZCKuTeXwhJ8Y/Bugs%20&%20Issues?api_key=keyPuc97lyyAVTVrv')
            .then(response => {
                console.log(response.data);
                let bugs = {
                    lanes: []
                }
                let status = []
                response.data.records.map((value, index) => {
                    if(value.fields.Status && !status.includes(value.fields.Status)){
                        status.push(value.fields.Status);
                    } 
                })
                console.log(status);
                status.forEach(stat => {
                    bugs.lanes.push(
                        {
                            id: stat,
                            title: stat,
                            cards: []
                        }
                    )
                })
                response.data.records.map((value, index) => {
                    bugs.lanes.map(record => {
                        if (value.fields.Status === record.title) {
                            record.cards.push(
                                {
                                    id: value.fields.Name,
                                    title: value.fields.Name || 'Sample Task',
                                    description: value.fields.Description,
                                    label: value.fields["Opened Date"]
                                }
                            )
                        } 
                    })
                })

                console.log(status);

                this.setState({ data: bugs })
            })
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                
                <Board data={this.state.data} />
            </div>
        );
    }
}

export default Dashboard;