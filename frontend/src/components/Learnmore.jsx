import React, { Component } from 'react';

class Learnmore extends Component {
    render(){
        return(
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                >
                Hello, I'm 
                <div style={{
                    fontWeight: 'bold',
                    textShadowRadius: 20,
                    fontSize: '3em'
                }}>Prashanth Yerramilli</div>
            </div>
        )
    }
}

export default Learnmore