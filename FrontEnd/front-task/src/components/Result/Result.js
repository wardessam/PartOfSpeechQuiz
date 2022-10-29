import {
    Link,
    useParams
  } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
const Result = ()=>{
    const { score } = useParams();
    let endpoint = 'http://localhost:3001/getScore/'+score;
    const [rank,setRank] = useState(0);
    useEffect(()=>{
        axios.get(endpoint,
            {'Access-Control-Allow-Origin': "*"})
      .then((res) => {
        if (res.status === 200) {
          setRank(res.data.Rank);
          console.log(res.data.Rank);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },[endpoint])
return(
<>
<div className='score-section'>
 You scored {score} out of 15, Your Rank is {rank}
<Link to={"/"}>
<Button variant="contained" color="success">Try Again</Button>
</Link>
</div>


 </>
);


}
export default Result;