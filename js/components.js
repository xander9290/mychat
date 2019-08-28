//LOGGIN FORM
var disponible=true;
var id;
//FORMULARIO DE REGISTRO(componente)
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userList:{
                users:[]
            }
        }

        this.nicRef=React.createRef();
        this.imgRef=React.createRef();
        this.checkRef=React.createRef();

        this.registro=this.registro.bind(this);
    }

    //se cargan la lista de usuarios para disponibilidad de nicname
    // componentDidMount(){
    //     this.UpdateUsers();
        
    // }

    // UpdateUsers(){
    //     this.nicRef.current.focus();
    //     fetch('./php/lecturaUsers.php')
    //     .then(response=>response.json())
    //     .then(data=>this.setState({
    //         userList:{users:data.users}
    //     }));

    //     this.state.userList.users.length>=0?log('Lista de usuarios cargada...'):log('no  se puedo cargar la lista de usuarios...');
    // }
    
    //registro de usuario
    registro(e){
        e.preventDefault();
        // this.UpdateUsers();
        //se obtienen los valores de los inputs
        var nic=this.nicRef.current.value,
              img=this.imgRef.current.value,
              i;

        //verifica que los inputs no estén vacíos
        if(nic!==''){

            // //si la lista de usuarios está vacía, el nicname estará disponible siempre
            // if(this.state.userList.users.length===0){
            //     disponible=true;
            // }else{
            //     //se comprueba la disponibilidad de nicname
            //     for(i=0;i<this.state.userList.users.length;i++){
            //         nic===this.state.userList.users[i].nic?disponible=false:disponible=true;
            //     }
            // }

            //si el usuario no tiene imagen, se le asigna una por defecto
            if(img===null||img===''){
                img='http://simi.concejodemedellin.gov.co/images/avatar.png';
            }

            //si el nicname está disponible, se creará el usuarios
            //de lo contrario se lanza una alerta negando el acceso
            if(disponible){
                //se crea el objeto usuario para su traspaso a JSON
                // const newUser={
                //     id:this.state.userList.users.length,
                //     nic:nic,
                //     img:img
                // }

                // this.state.userList.users.push(newUser);
    
                // //se crea la promesa que registra al user
                // fetch('./php/procesarUsers.php',{
                //     method:'POST',
                //     headers:{
                //         'Content-Type': 'application/json',
                //         'Accept':       'application/json'
                //     },
                //     body:JSON.stringify(this.state.userList)
                // })

                //se crean los storages con con los datos de usuario
                sessionStorage.setItem('user-id',id);
                sessionStorage.setItem('user-nic',nic);
                sessionStorage.setItem('user-img',img);
                //se recarga la página para comprobar que los storages de turno estén creados
                window.location.reload();
            }else{
                alert('Este nic no está disponible');
                this.nicRef.current.focus();
            }

            
        }else{
            alert('No deben quedar campos vacíos')
            return null;
        }
        
    }

    render(){
        id=this.state.userList.users.length;
        return(
            <div className="w3-container form-container">
                <div className="w3-card-4 form-div">
                    <div className="w3-container w3-blue-gray">
                        <h2>Regristro</h2>
                    </div>
                    <form className="w3-container" onSubmit={this.registro}>
                        <p>
                        <input 
                            ref={this.nicRef}
                            className="w3-input"
                            type="text"
                            placeholder="nick name"
                            autoComplete="off"
                        />
                        </p>
                        <p>
                        <input
                            ref={this.imgRef}
                            className="w3-input"
                            type="text"
                            placeholder="URL image"
                            autoComplete="off"
                        />
                        </p>
                        <p>
                        <input
                            ref={this.checkRef}
                            type="checkbox"
                            className="w3-check" 
                            disabled  
                        />
                        Recordar
                        </p>
                        <p>
                            <button className="w3-btn w3-blue">Entrar</button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
//SISTEMA DE ENVIO DE MENSAJES(componente)
class Send extends React.Component{
    constructor(props){
        super(props);

        this.msjRef=React.createRef();
        this.sendMsj=this.sendMsj.bind(this);
    }

    componentDidMount(){
        this.msjRef.current.focus();
    }

    sendMsj(e){
        e.preventDefault();
        //se cargan los datos de usuario por medio de los storages de turno
        const id=sessionStorage.getItem('user-id');
        const nic=sessionStorage.getItem('user-nic');
        const img=sessionStorage.getItem('user-img');
        const mjs=this.msjRef.current.value;
        //se crea el objeto del mensaje para su traspaso a JSON
        const msjBody={
            id:this.props.id,
            userId:id,
            nic:nic,
            msj:mjs,
            img:img
        }
        
        // this.state.chatList.chat.push(msjBody);

        //verifica que la caja de text de chat no esté vacía
        if(this.msjRef.current.value!==''||this.msjRef.current.value!==null){

            fetch('./php/procesarChat.php',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                body:JSON.stringify(msjBody)
            })
            .then((data)=>{
                log('Respuesta en ProcesarChat: '+data.text)
            })
            .then((err)=>{
                log('Error en ProcesarChat: '+err);
            });

            this.msjRef.current.value='';
            this.msjRef.current.focus();

        }else{
            return null;
        }
    }

    render(){
        return(
            <form onSubmit={this.sendMsj}>
                <input 
                ref={this.msjRef} 
                type="text" 
                placeholder="mensaje" 
                autoComplete="off" 
                />
                <button 
                className="w3-ripple w3-blue" 
                type="submit">Enviar</button>
            </form>
        )
    }
}
//SUBCOMPENENTE QUE CREA LAS CAJAS DE LOS CHATS(component)
const MsjBox=props=>{

    return(
        <p onMouseOver={props.over} onMouseOut={props.out}>
            <img src={props.img} />
            <span className="nick-name">{props.nic}</span>
            <span className="message">{props.msj}</span>
        </p>
    )
}
//SUBCOMPONENTE QUE MUESTRA LOS USUARIOS EN TURNO
const UsersBox=props=>{

    // const imgStyle=()=>{
    //     return{
    //         width:'45px',
    //         height:'45px',
    //         float: 'left',
    //         marginRight: '7px',
    //         borderRadius:' 50%'
    //     }
    // }

    // const nicStyle=()=>{
    //     return{
    //         fontWeight: '600',
    //         marginLeft: '65px',
    //         display:' block',
    //         marginRight: '4px'
    //     }
    // }

    return(
        <p className="w3-bar-item w3-text-black w3-light-grey w3-border">
            <img src={props.img} />
            <span>{props.nic}</span>
        </p>
    )
}
