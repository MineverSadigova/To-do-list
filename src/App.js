import React, { useState } from 'react'
import './App.css'
import List from './List'
const App = () => {
  const [list, setList] = useState([])
  const [data, setData] = useState({})

  const handleInput = (e) => {
    const { value } = e.target
    setData({ desc: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    let lastId = 0;
    if (list.length > 0) {
      list.sort((a, b) => a.id - b.id);
      lastId = list.at(-1).id + 1;
    } else {
      lastId += 1;
    }
    setList([...list, { ...data, id: lastId }]);
    e.target.reset();
  };

  const handleDelete = (id) => {
    setList(list.filter((e) => e.id !== id))
  }
  const editItem = (e) => {
    let el = list.find((a) => a.id === e.id);
    let temp = [...list];
    let index = temp.indexOf(el);
    el.desc = e.desc;
    temp.splice(index, 1, el);
    setList(temp);
  };
  return (
    <div className='container mt-5'>
      <h1 className='textcenter'>To Do List</h1>
      <div className='col-12 mt-3'>
        <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
          <div className='row'>

            <div className='col-9'>
              <input className='form-control ' type='text' defaultValue={""} required onChange={(e) => {
                handleInput(e)
              }} />

            </div>

            <div className='col-3'>
              <button className='btn btn-success w-100'>Əlavə et</button>
            </div>

          </div>
        </form>

        <div className='col-12'>
          <div className='row'>
            {
              list.map((index, key) => {
                return (
                  <List handleDelete={handleDelete} editItem={editItem} id={index.id} key={key} desc={index.desc} />
                )

              })
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default App