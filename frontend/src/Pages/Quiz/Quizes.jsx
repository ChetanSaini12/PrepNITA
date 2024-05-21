import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_QUIZ } from '../../gqlOperatons/Quiz/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import toast from 'react-hot-toast';
import { Loader } from '../Loader';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';


function Quizes() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);


  const [ERROR, setError] = useState(null);
  const [quizes, setQuizes] = useState(null);
  // const [duration, setDuration] = useState({});




  const [getAllQuiz] = useMutation(GET_ALL_QUIZ, {
    onError: (error) => {
      console.log("on erro at all quiz ", error);
      return setError(error);
    }

  });

  useEffect(() => {
    (
      async () => {
        dispatch(setLoading(true));
        try {
          const { data, errors } = await getAllQuiz();
          if (errors) {
            dispatch(setLoading(false));
            return setError(errors);
          }
          else if (data) {
            dispatch(setLoading(false));
            // console.log("all quizes ", data);
            setQuizes(data.getAllQuiz);
            // return setQuizes(data.getAllQuiz
          }

        } catch (error) {
          // console.log("error", error);
          dispatch(setLoading(false));
          return setError(error);
        }
      }
    )();

  }, []);







  if (isLoading) {
    return <Loader />;
  }
  if (ERROR) {
    toast.error(ERROR.message ? ERROR.message : ERROR || "something went wrong");
  }
  return (
    <div className='flex flex-col items-center my-5 mx-1 gap-5 w-screen min-h-screen' >
      <div>
        <div className='text-lg md:tex-xl '> some heading or intro will be here </div>
        <div className='flex gap-2 '>
          <div>Want to create a new quiz ?  </div>
          <button onClick={() => (navigate('/quiz/new'))} className='font-semibold underline'>create quiz </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 text-wrap'>
        {quizes && quizes.map((quiz) => (
          <Link to={`/quiz/id/${parseInt(quiz.id)}`}>
            <div key={quiz.id} className="mx-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-5 px-10 md:p-6 hover:shadow-lg hover:bg-gray-300
             dark:hover:bg-gray-700 transition duration-300 min-w-80  min-h-36">
              <div className='flex flex-col gap-5'>
                <div className='underline underline-offset-4 text-lg font-semibold flex justify-center -mt-4 '>{quiz.title}</div>
                {/* <div>author ✍🏼 {quiz.createdBy}</div> */}
                {/* <div>{quiz.startTime}</div> */}
                <div className='flex  justify-between'>
                  <div className=''>📅 {moment(quiz.startTime).format('DD MMMM YY')}</div>
                  <div className=''>🕗 {moment(quiz.startTime).format('HH:mm:ss')} IST</div>
                </div>
                <div className='flex justify-between'>
                  <div>Duration</div>
                  <div>
                    {(() => {
                      const days = moment(quiz.endTime).diff(moment(quiz.startTime), 'days');
                      const hours = moment(quiz.endTime).diff(moment(quiz.startTime), 'hours') % 24;
                      const minutes = moment(quiz.endTime).diff(moment(quiz.startTime), 'minutes') % 60;
                      const seconds = moment(quiz.endTime).diff(moment(quiz.startTime), 'seconds') % 60;

                      return `${days ? days + " Days " : ""}${hours ? hours + " Hours " : ""}${minutes ? minutes + " Minutes " : ""}${seconds ? seconds + " Seconds" : ""}`;
                    })()}
                  </div>

                </div>

              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Quizes