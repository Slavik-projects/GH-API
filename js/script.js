//token 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
const fm = document.forms.main;
 const inp = fm.mainInput;

 const content = document.querySelector('.content');

 const sendBtn = fm.mainSubmit;
 console.log(inp.value)

import { Octokit } from "https://esm.sh/octokit";
const octokit = new Octokit({
	//auth: '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'
	auth: config.SECRET_KEY
 });
 try{
	const result = await octokit.request('GET /users/{username}/repos', {
		username: 'slavik-projects',
		headers: {
		  'X-GitHub-Api-Version': '2022-11-28'
		}
	 });
	 let repositories = result.data;
	 console.log(repositories)//result.data this is array
	 content.innerHTML = repositories.map(el=>`<div class='rep'><p>${el.name}</p></div>`);
 fm.addEventListener('submit', function(e){
	e.preventDefault();
	console.log('SubmitForm');
	
	if(inp.value !== ''){
      const reposToDisplay = repositories.filter( repository => repository.name.substring(0, 3) === inp.value.substring(0, 3))
		console.log(reposToDisplay);
		content.innerHTML = '';
		content.innerHTML = reposToDisplay.map(el=>`<div class='rep'><p><span>${el.name.substring(0,3)}</span>${el.name.substring(3)}</p></div>`);
	}
	if(inp.value === ''){
		content.innerHTML = repositories.map(el=>`<div class='rep'><p>${el.name}</p></div>`);
	}
 })
 } catch(error) {
	if(error.response) {
		console.error(`Error! Status: ${error.response.status}. Message:
		${error.response.data.message}`)
	}
	console.error(error)
 }
 
 
 /*const quote = 'Hello from the outside';
 for(let i=0; i < quote.length; i++){
	console.log(quote[i])
 }*/





