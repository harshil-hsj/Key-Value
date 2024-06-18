
import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
function About() {
  return (
    <div className="about-container">
      <nav className='navbar'><h1>About Password Manager</h1></nav>
      
      <section className="motivation-section">
        <h2>Our Motivation</h2>
        <p>
          In today's digital age, the number of online accounts and the complexity of managing multiple passwords have become a significant challenge. Many people resort to using simple, easy-to-remember passwords or reusing the same password across multiple sites, which increases the risk of security breaches. Our motivation behind developing this Password Manager app is to provide a secure, convenient, and user-friendly solution to this problem.
        </p>
        <p>
          We believe that everyone deserves to have peace of mind when it comes to their online security. That's why we've created a tool that not only helps you generate strong, unique passwords for all your accounts but also stores them securely, so you never have to worry about forgetting a password again.
        </p>
      </section>
      
      <section className="advantages-section">
        <h2>Why Our Password Manager is Better</h2>
        <ul>
          <li><strong>Security First:</strong> Our Password Manager employs state-of-the-art encryption techniques to ensure that your passwords are stored securely. We use advanced algorithms to protect your data, so you can trust that your information is safe with us.</li>
          <li><strong>User-Friendly Interface:</strong> We designed our app with simplicity in mind. With an intuitive interface, even those who are not tech-savvy can easily navigate and manage their passwords.</li>
          <li><strong>Cross-Platform Support:</strong> Whether you are using a computer, tablet, or smartphone, our Password Manager is accessible from any device. This means you can access your passwords anytime, anywhere.</li>
          <li><strong>Password Generator:</strong> Our built-in password generator helps you create strong, unique passwords for each of your accounts, enhancing your online security.</li>
          <li><strong>Secure Sharing:</strong> Need to share a password with a trusted family member or colleague? Our app allows secure sharing of passwords, ensuring that sensitive information is transmitted safely.</li>
          <li><strong>Regular Updates:</strong> We are committed to continuously improving our app. Regular updates ensure that you always have the latest features and security enhancements.</li>
          <li><strong>Customer Support:</strong> We pride ourselves on providing excellent customer support. If you ever have any questions or issues, our support team is here to help.</li>
        </ul>
      </section>
      <div className="GoBack">
     <Link to='/login'>
        <button>Login</button>
     </Link>
     <Link to='/register'>
        <button>Sign Up</button>
     </Link>
     <Link to='/'>
        <button>Home</button>
     </Link>
    </div>
    </div>
    
  );
}

export default About;
