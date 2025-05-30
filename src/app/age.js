import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import newcard from './newcard.jpeg';
import teen from './teen.jpeg';
const Age = () => {
return (
  <div>
    <div class="card" style={{ width: "18rem" }}>
      <img class="card-img-top" src={newcard} alt="Age group 5-10 years" />
      <div class="card-body">
        <h5 class="card-title"> 5-10 years </h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href="#" class="card-link"> Body Basics </a></li>
        <li class="list-group-item"><a href="#" class="card-link"> Good Touch / Bad Touch </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link">  Hygiene Lessons </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link"> Consent Basics </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link"> Stories and Quizzes</a></li>
      </ul>
      <div class="card-body">
      </div>
    </div>

    <div class="card" style={{ width: "18rem" }}>
      <img class="card-img-top" src={teen} alt="Age group 5-10 years" />
      <div class="card-body">
        <h5 class="card-title"> 11-15 years </h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><a href="#" class="card-link">Puberty Education</a></li>
        <li class="list-group-item"><a href="#" class="card-link"> Sexual Health Basics </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link">Consent & Boundaries  </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link"> Gender Identity </a> </li>
        <li class="list-group-item"> <a href="#" class="card-link"> Healthy Relationships </a></li>
      </ul>
      <div class="card-body">
      </div>
    </div>
  </div>



  
);

}

export default Age;