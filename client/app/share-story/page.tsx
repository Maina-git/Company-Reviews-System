"use client"
import React, { useState } from 'react';
import ShareStory from '@/components/Story/ShareStory';
import { CompanyType } from '@/type';
import { useRouter } from 'next/router';
//import Select from 'react-select/base';

const SharedStoryPage = () => {
  /*
const [loading,setLoading] = useState(false);
const [companies, setCompanies] = useState<CompanyType[]>([]);
*/
//const router = useRouter();
/*
const companyOptions = companies.map((c)=>({
  label:c.name,
  value:c.name
}))
*/

//user type  options
/*
const userTypeOptions =[
  {value:"individual customer", lebel:"Individual Customer"},
  {value:"business customer", lebel:"Business Customer"},
  {value:"bank employee", lebel:"Bank Employee"},
  {value:"former employee", lebel:"Former Employee"},
  {value:"investor", lebel:"Investor"},
  {value:"other", label:"Other"}
];
*/
//fetch our  comnpany data
  return <ShareStory/>
}

export default SharedStoryPage;
