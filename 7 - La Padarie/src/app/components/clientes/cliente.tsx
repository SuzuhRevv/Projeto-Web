'use client'
import React, { useEffect, useState } from 'react';
import './cliente.css';
import Image from 'next/image';
import Lixeira from './../../figures/Lixeira.svg';

type Post = {
  id: number;
  name: string;
  bread: number;
  value: number;
};

export async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/todos');
  const data = await res.json();
  return data.posts;
}

export async function fetchData() {
    try {
      const posts = await fetchPosts();
  
      const totalBread = posts.reduce((acc, post) => acc + post.bread, 0);
      const totalPeople = posts.length;
      const totalValue = posts.reduce((acc, post) => acc + post.value, 0);
  
      return { totalBread, totalPeople, totalValue };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { totalBread: 0, totalPeople: 0, totalValue: 0 };
    }
  }
  

export default function Cliente() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newPosts = await fetchPosts();
      setPosts(newPosts);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const deleteCliente = async (clientId: number) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${clientId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const updatedPosts = posts.filter((post) => post.id !== clientId);
      setPosts(updatedPosts);
    } catch (error) {
    }
  };

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="cliente">
          <section className="info">
            <div className="info-div">
              <h2>{post.name}</h2>
              <div className="info-total">
                <p>
                  Total de pães: <span>{post.bread} pães</span>
                </p>
                <p>
                  Total a pagar: <span>R$ {post.value.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <a>
              <Image onClick={() => deleteCliente(post.id)} src={Lixeira} alt="lixeira" />
            </a>
          </section>
        </div>
      ))}
    </>
  );
}
