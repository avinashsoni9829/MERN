import React from 'react'

const  Base=(
{
      title="My Title",
      description="My description",
      className="bg-dark text-white p-4",
      children

}

)=> {
    return (
        <div>
        <div>

            <div className="container_fluid">
                <div className="jumbotron bg-dark text-white text-center">
               <h2 className="display-4">{title}</h2>
               <p className="lead">{description}</p>
               </div>

            </div>
           
             <div className={className}>{children}</div>
            
        </div>

    
        
        <footer className="footer bg-dark mt-auto py-3">
           
           <div className="container-fluid bg-success text-white text-center py-3">
           
           <h4> if Your Got Any Questions , Feel free to reach out!</h4>
           <button className="btn btn-warning btn-lg">Contact Us</button>


           </div>
           
           <div className="container">

           <span className="text-muted">
            An amazing <span className="text-white">MERN</span> bootcamp   
            </span> 

           </div>

        </footer>


        </div>
    )
}

export default Base;
