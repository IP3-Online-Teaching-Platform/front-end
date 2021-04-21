import React, { Component, createContext } from "react";
import { auth } from "../Components/Auth/Firebase-Auth";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };

    componentWillMount = async () => {
        this.unsubscribe = auth.onAuthStateChanged(userAuth => {
            const user = userAuth
            this.setState({ user });
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;