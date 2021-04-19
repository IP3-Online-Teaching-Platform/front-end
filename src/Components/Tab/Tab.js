import React from "react";

const Tabs = () => {
    return (
        <div className="tabs" >
            {}
        </div>
    );
}

Tabs.propTypes = {
    children: function (props, propName, componentName) {
        const prop = props[propName];
        let error = null;
        React.Children.forEach(prop, function (child) {
            if (child.type !== TabPane) {
                error = new Error(
                    "`" + componentName + "` children should be of type `TabPane`."
                );
            }
        });
        return error;
    }
};

export default Tabs;