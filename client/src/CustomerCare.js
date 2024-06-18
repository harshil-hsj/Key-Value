import { useState } from "react";
import './CustomerCare.css';
function CustomerCare(){
 return(
    <div className="cc-background">
      <h1 >Contact Us</h1>
       <div className="buttons">
        <button>E-Mail Us</button>
        <button>Call-Centre</button>
        <button>Write us a Review</button>
       </div>
    </div>
 )
}
export default CustomerCare;