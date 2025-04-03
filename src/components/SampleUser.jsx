import React from "react";
import User from "./User";

class SampleUser extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: 'MERN Stack student',
            location: 'India',
            hobbies: ['Reading','Coding'],
            users: []
        }
        console.log('Inside constructor: 1 - Mounting Phase')
    }
    static getDerivedStateFromProps(props, state){
        console.log('Inside getDerivedStateFromProps: 2 - Mounting Phase and Updating Phase')
        return null
    }
    componentDidMount(){
        console.log('Inside componentDidMount: 3 Mounting Phase')
        localStorage.setItem('ourApp', 'MERN Stack')
        setTimeout(()=>{
            this.setState({name: 'MERN Stack Developer'})
        }, 5000)
        const fetchUsers = async () => {
            try {
                const usersResponse = await fetch('http://localhost:5000/users')
                const usersList = await usersResponse.json()
                // setUsers(usersList)
                this.setState({users: usersList})
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps, nextState, this.props, this.state)
        console.log('Inside shouldComponentUpdate: 5 - Updating Phase')
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        // console(prevProps, prevState)
        console.log('Inside getSnapshotBeforeUpdate: 6 - Updating Phase')
        return null
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('Inside componentDidUpdate: 7 - Updating Phase')
        // setTimeout(()=>{
        //     this.setState({name: 'MERN Stack Developer'})
        // }, 5000)
        // const fetchUsers = async () => {
        //     try {
        //         const usersResponse = await fetch('http://localhost:5000/users')
        //         const usersList = await usersResponse.json()
        //         // setUsers(usersList)
        //         this.setState({users: usersList})
        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }
        // fetchUsers()
    }
    componentWillUnmount(){
        console.log('Inside componentWillUnmount: 8 - Unmounting Phase')
        // clearTimeout()
    }
    render(){
        console.log('Inside render: 4')
        // JS code
        const {name} = this.state
        const ourAppData = localStorage.getItem('ourApp')
        return(
            <>
                <div>Welcome : {name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px'}}>
            {
                this.state.users.map((user, index) => {
                    return <User key={index} {...user} />
                })
            }
        </div>
        <p>{ourAppData}</p>
            </>
        )
    }
}

export default SampleUser;