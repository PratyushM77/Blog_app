import React, { useEffect, useState } from 'react';

function Read() {
  const [saveBlog, setSaveBlog] = useState([]);

  const readBlog = async () => {
    try {
      const response = await fetch('http://localhost:3000/read', {
        method: 'GET',
      });
      const result = await response.json();

      if (!response.ok) {
        console.log('Internal server error')
       
      }

      if (response.ok) {
        console.log(result);
        setSaveBlog(result.read);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readBlog();
  }, []);

  return (
    <div className="container mt-10 mx-auto gap-20 max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 ">
      {saveBlog.map((element, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
        >
          <div className='flex justify-center mb-6'>

          <h2 className="text-3xl  font-bold text-gray-800 mb-2">{element?.title}</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">{element?.summary}</p>
         
          <div dangerouslySetInnerHTML={{ __html: element.content }} className="text-gray-700 mt-8 leading-relaxed"></div>
          <div className='text-sm flex justify-end font-sans text-gray-800'><span>Blog By - <span  className='text-gray-950 text-lg'><u>{element?.blogger}</u></span></span></div>
        </div>
      ))}
    </div>
  );
}

export default Read;
