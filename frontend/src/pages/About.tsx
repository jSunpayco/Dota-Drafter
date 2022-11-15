import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import HeaderMiddle from '../components/HeaderMiddle.tsx';

function About(props) {  

    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
      }, []);

    const fetchUsers = () => {
      axios.get('http://localhost:5000/colors')
      .then((res) => {
        console.log(res)
        setUserList(res.data)
      })
      .catch((err) => console.log(err))
    
      // return fetch('/api/about')
      //   .then((response) => response.json())
      //   .then((data) => {
      //       setUserList(data);
      //   });
    };
    
    const heroCards = userList
      .map((heroItem) => (
        <p>{heroItem.color}'s hex is {heroItem.value}</p>
      ));
    
    return (
      <div>
        <HeaderMiddle activeTab={0} />
        {heroCards}
      </div>
    );
  }
  
  export default About;