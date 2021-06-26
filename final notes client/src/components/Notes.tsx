import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Button, CardHeader, Input, Card, Chip, Typography, Checkbox } from '@material-ui/core';
import { getNotes, createNote, updateNote, deleteNote, getNote} from '../controller/notes'

const notes = [
    { title: "Title", description: "some description", tags: ["book", "shelf", "something"] },
    { title: "Title2", description: "some description 2", tags: ["book", "shelf"] },
    { title: "Title3", description: "some description 3", tags: ["book", "shelf", "chuirciu4"] },
    { title: "Title4", description: "some description 4", tags: ["book", "shelf", "something"] }
]

const tags = ["important", "temporary", "useful"]
const colors = ['rosybrown', 'lightyellow', 'lime']

const initialState = {
    title: '',
    description: '',
    tags: Array(),
    notes: Array(),
    tagValue:'',
    type: 'create',
    noteId:'',
    color:'',
    userName:''
}
const Notes = (props: any) => {
    const [state, updateState] = useState(initialState)

    useEffect(() => {
        const userStr:any = localStorage.getItem('user')
        getNotes().then((data) => {
            const user = JSON.parse(userStr)
            updateState({...state, notes: data.data.posts, userName: user.name})
        }).catch(e => console.log('EE', e.message))
    }, [])

    const onSubmit = () => {
        const { title, tags, description, color} = state
        if (title || description) {
            if(state.type === 'update') {
                updateNote(state.noteId, { title, tags, description, color  }).then(() => {
                    getNotes().then((data) => {
                        updateState({...state, notes: data.data.posts, title:'', description:'', tags: [], type:'create', color: state.color })
                    })
                }).catch(e => console.log('EE', e.message))
            } else {
                createNote({ title, tags, description, color }).then(data => {
                    getNotes().then((data) => {
                        updateState({...state, notes: data.data.posts, title:'', description:'', tags: [] })
                    })
                }).catch(e => console.log('EE', e.message))
            }
        }
    }
    console.log('####', state)
    return (
        <div>
             <div style={{display:'flex', justifyContent:'space-between'}}>
             {
                 <Typography style={{marginLeft:'20px'}} variant="h6">{state.userName}</Typography>
             }
             <Button variant="contained" onClick={() => {
                 props.history.push('/auth')
                 localStorage.clear()
             }}style={{display: 'flex', alignSelf:'end', marginRight:'20px'}}> Logout </Button>
             </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <Card style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {
                            state.notes.map(note => (
                                <div style={{ cursor:'pointer', padding: '10px', margin: '10px', minWidth: '300px', border: '1px solid #d3d3d3', display: 'flex', flexDirection: 'column', backgroundColor: note.color || 'white' }}>
                                    <div style={{display: 'flex', width: '100%', justifyContent:'space-between'}}>
                                <span onClick={() => {
                                     updateState({...initialState})
                                     getNote(note._id).then(({data}) => {
                                        updateState({...state, ...data.note, type:'update', noteId: data.note._id })
                                     })

                                }}>
                                <strong>{note.title}</strong>
                                </span><span onClick={() => {
                                    deleteNote(note._id).then(() => {
                                        getNotes().then((data) => {
                                            updateState({...state, notes: data.data.posts, title:'', description:'', tags: [] })
                                        })
                                    })
                                }} style={{color:'red'}}>Delete</span></div>
                                    <br />
                                    <span>{note.description}</span>
                                    <br />
                                    <br />
                                    {
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {
                                                note.tags.map((tag:any) => (
                                                    <Chip label={tag} />
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </Card>
                <Card style={{ width: '500px', padding: '20px' }} title="Create Note">
                    <span> Title </span>
                    <br />
                    <Input value={state.title} onChange={e => updateState({ ...state, title: e.target.value })} placeholder="title" />
                    <br />
                    <br />
                    <span> Description </span>
                    <br />
                    <Input style={{width:'100%'}} value={state.description} onChange={e => updateState({ ...state, description: e.target.value })} placeholder="description" />
                    <br />
                    <br />
                    <span> Tags </span>
                    <br />
                    <div style={{display: 'flex'}}>
                    <Input value={state.tagValue} onChange={e => updateState({ ...state, tagValue: e.target.value })} placeholder="add tag" />
                    <Button onClick={() => {
                        if(state.tagValue && !state.tags.includes(state.tagValue)) {
                             updateState({...state, tags: [...state.tags, state.tagValue], tagValue:''})
                        }
                    }} style={{marginLeft:'5px'}}>Add tag</Button>
                    </div>
                    <br />
                    <br />
                    {
                        state.tags.map(tag => (
                            <Chip
                                label={tag}
                                onDelete={(e) => updateState({...state, tags: state.tags.filter((item:any) => item !== tag)})}
                            />
                        ))
                    }
                    <div style={{display:'flex'}}>
                        {
                            colors.map(color => (
                                <div 
                                onClick={() => {
                                    updateState({...state, color: color})
                                }} 
                                style={{borderRadius:'100px', cursor:'pointer', margin: '10px', backgroundColor:color, height:'30px', width:'30px', border: state.color == color ? 'black' : 'white' }}/>
                            ))
                        }
                    </div>


                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {
                            tags.map(tag => (
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                    <strong>{tag}</strong>
                                    <Checkbox
                                        color="primary"
                                        checked={state.tags.includes(tag)}
                                        onChange={(e) => {
                                            const newTags = e.target.checked ? [...state.tags, tag] : state.tags.filter((item) => item !== tag)
                                            updateState({ ...state, tags: newTags })
                                        }}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </div>
                            ))
                        }
                    </div> */}
                    <br />
                    <br />
                    <br />
                    <Button onClick={onSubmit} variant="contained" color="primary">{state.type === 'create' ? 'Create' : 'Update note'}</Button>
                </Card>
            </div>
        </div>
    );
}

export default Notes;
