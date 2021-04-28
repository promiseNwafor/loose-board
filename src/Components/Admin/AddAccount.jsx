import React, { useState, useContext } from 'react'
import Select from 'react-select';
import { AuthContext } from '../../App'
import './admin.css'

function AddAccount() {
    const {handleAddAccount} = useContext(AuthContext)
    const [accountName, setAccountName] = useState("")
    const [manager, setManager] = useState("")
    const [platform, setPlatform] = useState("")
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [shares, setShares] = useState(0)
    const [saves, setSaves] = useState(0)
    const [leads, setLeads] = useState(0)
    const [impressions, setImpressions] = useState(0)
    const [views, setViews] = useState(0)
    const [downloads, setDownloads] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [reach, setReach] = useState(0)

    const managers = [
        { value: 'Ramsey', label: 'Ramsey' },
        { value: 'Ayomide', label: 'Ayomide' },
        { value: 'Janelle', label: 'Janelle' },
        { value: 'Chucks', label: 'Chucks' },
    ];
    const platforms = [
        { value: 'facebook', label: 'facebook' },
        { value: 'twitter', label: 'twitter' },
        { value: 'instagram', label: 'instagram' },
        { value: 'linkedin', label: 'linkedin' },
    ];

    let idCounter = 1
    var date = new Date(),
    today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

    const handleBtnClick = () => {
        if (platform !== "" || accountName !== ""){
            switch(platform.value){
                case 'facebook':
                    
                    handleAddAccount({id: today, accountName, manager: manager.value, date: today, facebook: {likes, comments, reach, shares, leads, views, impressions, followers, downloads}})
                  
                break
                case 'twitter':
                    // setTwitter({
                    //     likes, comments, reach, shares, leads, views, impressions, followers, downloads
                    // })
                handleAddAccount({id: today, accountName, manager: manager.value, date: today, twitter: {likes, comments, reach, shares, leads, views, impressions, followers, downloads}})
                break
                case 'instagram':
                    // setInstagram({
                    //     likes, comments, reach, shares, leads, views, impressions, followers, downloads
                    // })
                    handleAddAccount({id: today, accountName, saves, manager: manager.value, date: today, instagram: {likes, comments, reach, shares, leads, views, impressions, followers, downloads}})
                break
                case 'linkedin':
                    // setLinkedin({
                    //     likes, comments, reach, shares, leads, views, impressions, followers, downloads
                    // })
                    handleAddAccount({id: today, accountName, manager: manager.value, date: today, linkedin: {likes, comments, reach, shares, leads, views, impressions, followers, downloads}})
                break
            }
        }
    }


    return (
        <div className="AddAccount">
        <div className="wrap">
            <div className="head">
                <h3>New Account</h3>
            </div>
            <form>
                <div className="Input">
                    <input onChange={(e) => setAccountName(e.target.value)}  placeholder="Account name" type="text" />
                </div>
                <div className="select">
                    <Select className="Select" placeholder="Community manager"
                        value={manager}
                        onChange={setManager}
                        options={managers}
                    />
                </div>
                <div className="select">
                    <Select className="Select" placeholder="Platform"
                        value={platform}
                        onChange={setPlatform}
                        options={platforms}
                    />
                </div>
                <div className="input">
                    <input onChange={(e) => setReach(e.target.value)} placeholder="Reach" type="number" required />
                    { platform.value === 'twitter' ? 
                        <input onChange={(e) => setShares(e.target.value)} placeholder="Retweets" type="number" required /> 
                        : <input onChange={(e) => setShares(e.target.value)} placeholder="Shares" type="number" required /> 
                    }
                    { platform.value === 'instagram' ?
                    <input onChange={(e) => setSaves(e.target.value)} placeholder="Saves" type="number" required />
                : ""}
                    <input onChange={(e) => setLeads(e.target.value)} placeholder="Leads" type="number" required />
                    <input onChange={(e) => setImpressions(e.target.value)} placeholder="Impressions" type="number" required />
                    <input onChange={(e) => setComments(e.target.value)} placeholder="Comments" type="number" required />
                    <input onChange={(e) => setDownloads(e.target.value)} placeholder="Downloads" type="number" required />
                    <input onChange={(e) => setLikes(e.target.value)} placeholder="Likes" type="number" required />
                    <input onChange={(e) => setViews(e.target.value)} placeholder="Views" type="number" required />
                    <input onChange={(e) => setFollowers(e.target.value)} placeholder="Followers" type="number" required />
                </div>
            </form>
            <div className="Btn">
                  <button onClick={handleBtnClick} className="btn" type="submit">SUBMIT</button>
              </div>
        </div>
        </div>
    )
}

export default AddAccount