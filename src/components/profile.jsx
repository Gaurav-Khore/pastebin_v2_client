export const ProfileDisplay = (props) => {
    return (
        <div style={{display:"flex" , flexDirection:"column",alignItems:"center"}}>
            <div>
            <img src="../../public/user.png" alt="profile" style={{height:"100px",width:"100px"}} />
            </div>
            <div>
            <h1 style={{justifyContent:"center",display:"flex"}}>{props.name}</h1>
            <h2>{props.email}</h2>
            </div>
        </div>
    );
}