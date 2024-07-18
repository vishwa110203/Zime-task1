// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tag, Input } from 'antd'
import 'antd/dist/reset.css'; 


function DataLoader() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
    axios.get('https://dummyjson.com/posts')
        .then(response => {
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        setLoading(false);
        })
        .catch(error => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
        });
    }, []);

    useEffect(() => {
        const filteredData = posts.filter(post => post.body.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredPosts(filteredData);
      }, [searchText, posts]);


    const handleSearch = (e) => {
        setSearchText(e.target.value);
      };

    if (loading) {
    return <div>Loading...</div>;
    }

    const columns = [
    {
        title: 'PostID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                let color = 'geekblue';
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })}
            </>
        ),
        filters:[
            {
                text: 'History',
                value: 'history',
            },
            {
                text: 'Crime',
                value: 'crime',
            },
            {
                text: 'Fiction',
                value: 'fiction',
            },
            {
                text: 'English',
                value: 'english',
            },
            {
                text: 'French',
                value: 'french',
            },
            {
                text: 'American',
                value: 'american',
            },
            {
                text: 'Magical',
                value: 'magical',
            },
            {
                text: 'Mystery',
                value: 'mystery',
            },
            {
                text: 'Love',
                value: 'love',
            },
            {
                text: 'Classic',
                value: 'classic',
            },
        ],
        onFilter: (value, record) => record.tags.includes(value),

    },
    {
        title: 'Reactions',
        children: [
            {
                title: 'Likes',
                dataIndex: ['reactions', 'likes'],
                key: 'likes',
                render: (text) => (
                    <span style={{ color: 'green' }}> 
                        {text}
                    </span>
                ), 
            },
            {
                title: 'Dislikes',
                dataIndex: ['reactions', 'dislikes'],
                key: 'dislikes',
                render: (text) => (
                    <span style={{ color: 'red' }}> 
                        {text}
                    </span>
                ),
                
            },


        ],
    },
    {
        title: 'Views',
        dataIndex: 'views',
        key: 'views',
    },
    {
        title: 'UserID',
        dataIndex: 'userId',
        key: 'userId',
    },
    ];


    const onChange = (pagination, filters, extra) => {
    console.log('params', pagination, filters, extra);
    };

    return (
    <div style={{ padding: '20px' }}>
        <Input
        placeholder="Search in body"
        size="large"
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
        <Table dataSource={filteredPosts} columns={columns} onChange = {onChange}  rowKey="id" loading={loading}  pagination={{ position: ['bottomCenter'] }}/>
    </div>
    );
};

export default DataLoader;
