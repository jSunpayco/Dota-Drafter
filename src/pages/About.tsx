const React = require('react')
const axios = require('axios')
const { useEffect, useState } = require('react')
const HeaderMiddle = require('../components/HeaderMiddle.tsx')

function About(props) {  

    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers();
      }, []);

    const fetchUsers = () => {
      axios.get('http://localhost:5000/heroStatus')
      .then((res) => {
        setUserList(res.data)
      })
      .catch((err) => console.log(err)
      )
    };
    
    const heroCards = userList
      .map((heroItem) => (
        <p>{heroItem.localized_name}'s is a {heroItem.attack_type} {heroItem.primary_attr}</p>
      ));
    
    return (
      <div>
        <HeaderMiddle activeTab={0} />
        <p style={{ marginTop: 100 }}>{userList.length}</p>
        {/* {heroCards} */}
      </div>
    );
  }
  
  export default About;