class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chats:{
                msg:[]
            },
            userlist:{
                users:[]
            }
        }

        this.stopUpdate=this.stopUpdate.bind(this);
        this.goUpdate=this.goUpdate.bind(this);
    }

    //al montarseel componente se llama a la función Updata que actualiza
    //la información en el servidor
    componentDidMount(){
        this.upDate();
        this.state.chats.msg.length>=0?log('Lista mensajes cargada...'):log('no  se puedo cargar la lista de mensajes...');

        //se crea un temporizador que invocara a la función update (n) milésimas
        this.timerUpdate=setInterval(()=>this.upDate(),400);
        //se crea el usuario en la lista de activos

    }
    //se crea el método que actualizará los mensajes en el cuerpo de chats
    upDate(){
        fetch('./php/lecturaChat.php')
        .then(response=>response.json())
        .then(data=>this.setState({
            chats:{msg:data.chats}
        }));

        fetch('./php/lecturaUsers.php')
        .then(response=>response.json())
        .then(data=>this.setState({
            Userlist:{users:data.users
            }
        }));

        const div=document.getElementById('chat-body');
        if(div===null){
            return null
        }else{
            div.scrollTop=div.scrollHeight;
        }
    }

    //detiene la actualización mediante scrolling del cuerpo de chats
    stopUpdate(){
        clearInterval(this.timerUpdate);
    }

    //reanuda la actualización después de haber quitado el ratón en el cuerpo de chats
    goUpdate(){
        this.timerUpdate=setInterval(()=>this.upDate(),300);
    }

    render(){
        //si el storage de turno no está creado, se procede a mostrar el formulario de registro
        if(sessionStorage.getItem('user-nic')===null){
            return(
                <div  id="main-container" className="w3-card main-container">
                    <LoginForm />
                </div>
            )
        }else if(sessionStorage.getItem('registrado')){
            return <h2>Registrado</h2>
        }else{
            return(
                <div id="main-container" className="w3-card main-container">
                    <div className="w3-sidebar w3-bar-block w3-card users-container">
                        {/* <h4 className="w3-bar-item w3-text-white w3-border-bottom">USERS</h4> */}
                        {
                             this.state.userlist.users.map(d=>(
                                <UsersBox key={d.id}
                                    img={d.img}
                                    nic={d.nic}
                                />
                            ))
                        }
                    </div>
                    <div className="chat-header w3-container">
                        <h2 className="w3-text-white">Public Chat</h2>
                    </div>
                    <div id="chat-body" className="chat-body">
                        {
                            this.state.chats.msg.map(d=>(
                                <MsjBox 
                                    key={d.id}
                                    img={d.img}
                                    nic={d.nic}
                                    msj={d.msj}
                                    over={this.stopUpdate}
                                    out={this.goUpdate}
                                />
                            ))
                        }
                    </div>
                    <div className="chat-footer">
                        <Send 
                            id={this.state.chats.msg.length}
                        />
                    </div>
                </div>
            )
        }
    }
}

const log=msg=>{
    console.log(msg);
}

ReactDOM.render(<App />,document.getElementById('root'));