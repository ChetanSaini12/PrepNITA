import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { DOWN_VOTE_QUESTION, GET_QUESTION_BY_ID, UP_VOTE_QUESTION } from '../../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import { Button } from 'flowbite-react';

const QuestionById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params=useParams();
  let id = parseInt(params.id);

  const { isLoading, loggedIn } = useSelector((state) => state.user);
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [ERROR, setError] = useState(null);
  const [question, setQuestion] = useState(null);


  const [getQuestion] = useMutation(GET_QUESTION_BY_ID, { onError: (error) => { return setError(error) } });
  const [upVote] = useMutation(UP_VOTE_QUESTION, { onError: (error) => { return setError(error) } });
  const [downVote] = useMutation(DOWN_VOTE_QUESTION, { onError: (error) => { return setError(error) } });

  useEffect(() => {
    dispatch(setLoading(true));
    (async() => {
      try {
        const { data, errors } = await getQuestion({ variables: { QuestionId: id } });
        console.log("response of question by id ", data,errors);
        if (errors) {
          // toast.error("Question not found with this id ");
          dispatch(setLoading(false));
          // navigate('/questions');
          return setError(errors);
        }
        else if (data) {
          setQuestion(data.getQuestionById);
          setUpvote(data.getQuestionById.upvotes);
          setDownvote(data.getQuestionById.downvotes);
          dispatch(setLoading(false));
        }
        else {
          dispatch(setLoading(false));
        }
        // setQuestion(res.data.getQuestionById);

      } catch (error) {
        dispatch(setLoading(false));
        return setError(error);
      }
    })();
  }, [id]);

  const handleUpVote = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const { data, errors } = upVote({
        variables: { QuestionId: id }
      });

      console.log("response of upvoting question by id ", data);
      if (errors) {
        dispatch(setLoading(false));
        return setError(errors);
      }
      else if (data) {
        setUpvote(upvote + 1);
        dispatch(setLoading(false));
      }
      else dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return setError(error);
    }
  };
  const handleDownVote = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const { data, errors } = downVote({
        variables: { QuestionId: id }
      });
      if (errors) {
        dispatch(setLoading(false));
        return setError(errors);
      }
      else if (data) {
        setDownvote(downvote + 1);
        dispatch(setLoading(false));
      }
      else dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      return setError(error);
    }
  };

  if (ERROR) {
    console.log("Error in Question by id ", ERROR);
    toast.error(ERROR.message ? ERROR.message : "Something went wrong")
  }
  if (isLoading) return <Loader />;
  return (
    question ?
      (
        <div className="w-screen min-h-screen shadow-md rounded-md p-6 " >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{question.title}</h2>
            <div className="flex items-center text-sm mx-2 ">
              <span className="mr-4 font-bold">Question ID: {question.id}</span>
              <span className='font-bold'>Upvotes: {upvote} | Downvotes: {downvote}</span>
            </div>
          </div>
          <div className=" mb-4">
            {/* <h1 className='text-2xl font-bold'>{question.links?question.links[0].title:"TITLE not available"}</h1> */}
            <p className='text-2xl font-semibold'>{question.description}</p>
          </div>
          <div className=" mb-4">
            <strong>Tags:</strong> {question.tags?.map(tag => (
              <span key={tag} className="inline-block bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold mr-2">{tag}</span>
            ))}
          </div>
          <div className=" mb-4">
            <h3 className="font-bold">Answer:</h3>
            <p>{question.answer}</p>
          </div>
          <div className=" mb-4">
            <strong>Approved:</strong> {question.isApproved ? 'Yes' : 'No'}
          </div>

          {/* ...................UP Vote or Down Vote .............................. */}
          <div className="flex gap-5  mb-4" >
            <button onClick={handleUpVote}
              className= 'w-8 h-8 bg-white rounded-md hover:bg-green-200'>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO2ZPUgcQRTHf6IIMWrwA0ULbQxpIqSwEgXTWCiCRIu0YmOpRZrEJgTBVHapQho7QSwPTSOmE60UPwohjQbxE0VEMLkw8D+YYs+du9yaGdg/PFhu3syb38y+3bm3kCpVqlRSGTAObAK3wE/gC9BAIJP/CmQjbBd4huf6oMleAW+BJ8Ar7Yb5/RseawD4LTPXttqAe+AaqMJDPQcutMpmF6K0r/aXeKZqYFuTW1QeROlUPq14pDJgwUrS2jx+7fI5wTNNa2LnQMcDfm/kl8Ej9SsxTdIOxvjOCOATHibtewf/ZfkO80iqBD4DR3leSlmHpLV1HDNO1sEuge8Rj+hIzToOWuO4IGslAMhaFnsrHsqxO097bqDHVB0wCdwp9oM7ETfB/wGQ05Rim9spSIBGKyeCBGgIHWBEsVdDBZhX7HchApRbh8IXIQK8tg6OhAgwp7jmRRskwEHMC9ZrgE7FPFYuBAcwrZim6kGIAOuKORQiQCvwB7hxrWr4BjCheEuuHXwDyCjeWIgA1aqxmv/ezSECjCrWj0I6+QQw73J48xWg3PXwVixAE8mqT3H2Cu3oCrCVMMSc4pgSTyIASULUA2eK0VVo51xZpSeirdc6VG3p+kBljqclKqr1ABsae6WYQVwKWzNa+dzXlyRsH2gpdhVmrZ2w7ZfaKuRbpfrojlV0+he70/eGjyF8U0uVKhWl0V+Fmz8hJyRYQAAAAABJRU5ErkJggg==" />
            </button>

            <button onClick={handleDownVote}
              className='w-8 h-8 bg-white rounded-md hover:bg-red-200'>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACH0lEQVR4nO2ZPWhTURiGnzSkUKPSVrDSQXCQUrp0cNEKmYSqICSbq4O7i4Ohg9RCOtTJVdDRodCloJ0KdhAEHSrRlNJNJSjEH1BSWiIfvIFLyc9pmovnlPvAIRfOx3nPe849ud/9LiQkJBwrBoFF4AvQONC+qi+j2BPAHFABdlvEH7bVgTIwDwz3aqDkILQAnAXe9WHSjTbNFmW8FwOfNcCVFn1X1VcFNnW9DVwHshydDHAZeKux13oZpLkC3fobMmE70W9GgO/SuBSXgbgm3+SxdOzMxWIgzskbOel8IiYDcZMGvklrIkQDxnNp3SdQAwVpbYRqIAv8BfaBcyEaMFald4dADdyV3kqoBsZ0C/1R7hWcAeONNG8RqIEH0nwaqoGpSBJpD7jgDBhb0p0hUANLrsmdrwZy0rWdCNJA2jW589WAc3Lns4GCtNdDNTAi7R+hGjgj7VqoBu5J+5VLWcVKKL4YGNXk69KePWphy9opR/HXjuM1HNtDl9JiKbIT7doykHIwUO3DpGsqcnVceVcuRIpORYf4l4rN4xHXgD29aNzsEvtIBuzXK4qa2E9gskNcXnG2E16RAl5och+B023izivG8hjvOAl8cDjUzTPTU7k8bi7qX6LToa6o396svOSGDvS+rg/eQnbgfwNDeExRq/wLuK0SyHTkK47TC/n/xO7/Z20eROUOh9wrBlRJe6+a5g7wRGlwQkJCAi35BzYxPwkEQBJwAAAAAElFTkSuQmCC" />
            </button>
          </div >


        </div >
      ) :
      (<div className='w-screen min-h-screen shadow-md rounded-md p-6'>
      <h1 className='text-3xl flex justify-center'>Something went wrong </h1>
      </div>)
  )
}

export default QuestionById;