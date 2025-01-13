import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import ProfileNotSubscribed from '../components/ProfileNotSubscribed'
import ProfileSubscribed from '../components/ProfileSubscribed'
import Creator from '../components/Creator'

function Profile() {
    const {username} = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const navigate =  useNavigate()
    useEffect(()=>{
        api.get(`/api/user/profile/${username}/`)
        .then(res=>{
            console.log(res.data)
            setData(res.data)
        })
        .catch(err=>{
            alert(err)
            navigate("/404")
        })
        .finally(()=>{setLoading(false)})
    },[username])
    return (
        <div>
            {loading?<p>Loading data...</p>:
            <div>
                {data.profile.is_creator?
                <div>
                {/* MAIN PAGE OF A CREATOR AFTER LOADING */}
                   {data.my_page?(<Creator data={data}/>):(
                    data.is_subscribed?<ProfileSubscribed data={data}/>:<ProfileNotSubscribed data={data}/>
                   )} 
                </div>     
                :<div>{username} is not a creator</div>
                }
            </div>
            }
        </div>
    )}

export default Profile
