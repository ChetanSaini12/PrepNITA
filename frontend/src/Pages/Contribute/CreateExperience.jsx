import { Button, FloatingLabel, TextInput, ToggleSwitch } from "flowbite-react";
import React, { useState } from "react";
import TextEditor from "../../Components/sampleTextEditor";

const sampleExp = `<div><span style="font-weight: bold;">Note: THIS IS A SAMPLE EXPERIENCE. PLEASE CLEAR IT FIRST.
<br /><br /></span><span style="font-weight: bold;">Status:</span> Final year student, Tier 2 college (NIT/IIIT)
<br /><span style="font-weight: bold;">Position:</span> Software Engineer (University Graduate)
<br /><span style="font-weight: bold;">Location:</span> Bangalore/Hyderabad
<br /><span style="font-weight: bold;">Prior experience:</span> A combined experience of 1 year through a couple of summer internships
<br /><span style="font-weight: bold;">Date:</span> March, 2021
<br /><br /><span style="font-weight: bold;">Process:</span>
<br /><br />A recruiter reached out to me through mail and asked if I was interested in the Software Engineer (University Graduate) role.&nbsp;<br /><br /><span style="font-weight: bold;">Phone Screen(September 2020):</span>
<br />A straightforward LC medium question based on Trees and DFS. (<a href="https://leetcode.com/problems/delete-nodes-and-return-forest/" target="_blank">LINK</a>)<br />I was well versed with Trees. <br />Quickly came up with the optimal solution, explained the time and space complexities, and coded the proposed solution. <br />Interviewer was satisfied with my solution and we finished this round in less than 30 minutes.
<br /><br /><span style="font-weight: bold;">Onsites (March 2021):</span>

<br />There was a 6 month gap between my Phone Screen and Onsites. My recruiter explained that Onsites will be split into (3+2) interviews. They'll review the feedback after the first 3 DSA interviews and will schedule another 2 interviews (1 DSA, 1 Googlyness) only if the feedback is positive in the initial 3 DSA interviews.
<br /><br /><span style="font-weight: bold;">Round 1:</span>

LC Hard DP question. (<a href="https://leetcode.com/problems/stone-game-iii/" target="_blank">LINK</a>) <br />I quickly came with up the recursive solution but struggled to convert the recursive solution into a DP based solution. <br />This was my worst round.
<br /><br /><span style="font-weight: bold;">Round 2:</span>

LC Medium Sliding Window question. (<a href="https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/" target="_blank">LINK</a>)<br />Quickly explained the optimal solution, Time and space complexities and coded the solution.

Interviewer was satisfied and came up with a follow up question that involved DP. I used memoization to solve the follow up question. <br />Provided optimal solution and coded it. This was my best round.
<br /><br /><span style="font-weight: bold;">Round 3:</span>

A question based on the intersection of intervals. (I had forgotten that question.)<br />In this round, I got into tunnel vision and just wasn't able to come up with a more efficient solution. I was livid with myself since I had solved numerous interval intersection problems on Leetcode.
<br /><br /><span style="font-weight: bold;">Result:
</span>
Recruiter contacted me after 3-4 days and informed me that they won't be scheduling the next 2 rounds since I got mixed feedback in the first set of 3 DSA interviews. Recruiter didn't provide feedback specific to each round.
<br /><br /><span style="font-weight: bold;">My thoughts:</span>
<br /><ol><li>&nbsp;Don't have any weak areas while interviewing with Google. I covered pretty much all topics in-depth, except for DP. DP was my slightly weaker area as compared to the other topics. As it turned out, 2 out of my 3 Onsite interviews had a DP question. All hail Murphy's Law :)</li><li>&nbsp;Leetcode's Google frequent questions list does help. A total of 3 questions I faced in the Google interviews are in the top 20 of LC's Google questions (sorted by frequency)&nbsp;</li><li>&nbsp;Solved 465 LC problems - 166 Easy, 258 Medium, 41 Hard<br /><br /><br /></li></ol></div>
<p>I hope it will help you all.</p>`;

function CreateExperience() {
  const [companyName, setCompanyName] = useState("Google");
  const [position, setPosition] = useState("Software Engineer");
  const [data, setData] = useState(sampleExp);
  const [anonymous, setAnonymous] = useState(1);

  return (
    <div className="flex flex-col items-center w-full my-5">
      <h1 className="text-2xl">
        Share your recent experience of hiring process of any company
      </h1>
      <div className="flex flex-col gap-5 items-center mt-4 border-2 border-slate-500 w-4/5 rounded p-4">
        <div className="w-full gap-4 flex flex-col border-2 border-slate-700 p-4 rounded">
          <h1 className="text-xl">Preview : </h1>
          <hr />
          <div className="flex flex-col gap-2 bg-zinc-600 p-4">
            <div className="flex flex- justify-between gap-2 items-end">
              <div className="flex flex-row gap-2 items-end">
                <span className="text-4xl">{companyName}</span>
                <span className="text-xl bottom-0">| {position}</span>
              </div>
              <p>Written by -: {anonymous == 0 ? <span>Chetan Saini</span> : <span>Anonymous User</span>}</p>
            </div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: data }} />
          </div>
        </div>
        <div className="w-full border-2 border-slate-700 p-4 rounded">
          <h1 className="text-2xl">Editor : </h1>
          <hr />
          <div className="flex flex-row justify-between w-full my-2">
            <div className="flex flex-col justify-evenly">
              <FloatingLabel
                className="w-96 my-2"
                variant="outlined"
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <FloatingLabel
                className="w-96 my-2"
                variant="outlined"
                label="Role"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div className="flex justify-evenly flex-col border-2 rounded border-slate-700 p-2 bg-slate-700">
              <Button color="warning" className="w-full rounded">
                Request to Publish
              </Button>
              <ToggleSwitch
                checked={anonymous}
                label="Share Anonymously"
                onChange={setAnonymous}
              />
            </div>
          </div>
          <TextEditor data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default CreateExperience;
