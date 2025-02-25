import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import ProfileNotSubscribed from '../components/ProfileNotSubscribed'
import ProfileSubscribed from '../components/ProfileSubscribed'
import Creator from '../components/Creator'
import NotCreator from '../components/NotCreator'
import NotCreatorMypage from '../components/NotCreatorMypage'



function Profile() {
    const {username} = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const navigate =  useNavigate()
    useEffect(()=>{
        api.get(`/api/user/profile/${username}/`)
        .then(res=>{
            setData(res.data)
        })
        .catch(err=>{
            console.log(err)
            navigate("/404")
        })
        .finally(()=>{setLoading(false)})
    },[username])
    return (
        <div>
            {loading?<p>Loading data...</p>:
            <div>
                <div className='prof_top_part'><img height={'250px'} width={"100%"} alt='platform background picture' src='https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg' /></div>
                {data.profile.is_creator?
                <div>
                {/* MAIN PAGE OF A CREATOR AFTER LOADING */}
                   {data.my_page?(<Creator data={data}/>):(
                    data.is_subscribed?<ProfileSubscribed data={data}/>:<ProfileNotSubscribed data={data}/>
                   )} 
                </div>     
                :(data.my_page?(<NotCreatorMypage />):<NotCreator username={username} />)
                }
            </div>
            }
        </div>
    )}

export default Profile
