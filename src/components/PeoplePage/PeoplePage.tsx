import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PersonList } from '../PersonList';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getPeopleData = async () => {
      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getPeopleData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && <PersonList />}
        </div>
      </div>
    </>
  );
};
