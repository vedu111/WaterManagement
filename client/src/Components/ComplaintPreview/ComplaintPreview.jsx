import React from 'react'
import './ComplaintPreview.css'

let db = [
    {
        "username" : "Abhilasha Patil",
        "Tag1":"issue",
        "Tag2":"insufficient",
        "Date":"24-3-2024",
        "Area":"rajwada area",
        "query":"too many leaks and nobody is paying attention"
    },
    {
        "username" : "Aman Jain",
        "Tag1":"drainage",
        "Tag2":"pipe-leak",
        "Date":"25-3-2024",
        "Area":"geeta nagar",
        "query":"too many leaks and nobody is paying attention"
    }
]

 const ComplaintPreview = () => {

    
  return (

    db.map((user)=>{
        return(
            <>
            <div class = "div-main">
            <div class="div1">  
               <div class="div2">{user.username}</div>
               <div class="div3"><button class="tag1">{user.Tag1}</button>  <button class="tag2">{user.Tag2}</button> </div>
               <div class="div4">{user.Area}<span class="date">{user.Date}</span></div>
            </div>
        </div>
        </>
        )
    })
    

  )
};

export default ComplaintPreview;