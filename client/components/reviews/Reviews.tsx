"use client"

import { useRouter } from 'next/dist/client/components/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';
import { BASE_API_URL } from '@/server';

const Reviews = () => {

    // define  some  state  variable 

const [company, setCompany] = useState("");
const [vibe, setVibe] = useState("");
const [search, setSearch] = useState("");
const [sort, setSort] = useState("newest");
const [page, setPage] = useState(1);
const [reviews, setReviews] = useState<Reviews[]>([]);
const [totalPages, setTotalPages] = useState(1);
const [isLoading, setIsLoading] = useState(false);

const router = useRouter();

const debouncedCompany = useDebounce(company, 500);
const debounceSearch = useDebounce(search, 500);

useEffect(()=>{

    const fetchReviews = async () => {
    }

}, [])
  
  return (
    <div>
      Reviews 
    </div>
  );
}

export default Reviews;
