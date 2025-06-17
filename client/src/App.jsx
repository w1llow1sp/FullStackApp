import './App.css';
import {useQuery, useMutation, gql} from "@apollo/client";
import {useState} from "react";

const GET_USERS = gql`
query GetUsers {
  getUsers {
    id,
    age,
    name,
    isMarried
  }
}
`

const GET_USER_BY_ID = gql`
query GetUserByID($id: ID!) {
  getUserById(id: $id) {
    id,
    age,
    name,
    isMarried
  }
}
`


const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
    const [newUser, setNewUser] = useState({});

    const {
        data: getUsersData,
        error: getUsersError,
        loading: getUsersLoading
    } = useQuery(GET_USERS)
    const {
        data: getUserByIdData,
        error: getUserByIdError,
        loading: getUserByIdLoading
    } = useQuery(GET_USER_BY_ID, {
        variables: {id: '2'}
    })

    const [createUser] = useMutation(CREATE_USER)

    if (getUsersLoading) return <p>...Data loading</p>
    if (getUsersError) return <p>Error: {error.message}</p>

    const handleCreateUser = async () => {
        console.log('createUser :', newUser)
        await createUser({
            variables: {
                name: newUser.name,
                age: Number(newUser.age),
                isMarried: false,
            },
        });
    }

    return (
        <>
            <div>
                <input
                    placeholder="Имя"
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
                <input
                    placeholder="Возраст"
                    type="number"
                    onChange={(e) =>
                        setNewUser((prev) => ({ ...prev, age: e.target.value }))
                    }
                />
                <button onClick={handleCreateUser}> Создать пользователя</button>
            </div>

            <h1>Пользователи</h1>
            <div>
                {getUserByIdLoading
                    ? (<p>Loading...</p>)
                    : (<>
                        <h4>Выбранный пользователь :</h4>
                        <p> {getUserByIdData.getUserById.name}</p>
                        <p> {getUserByIdData.getUserById.age}</p>
                    </>)}
            </div>
            <div>
                {getUsersData.getUsers.map((user) => (
                    <div key={user.id}>
                        <h3>Имя: {user.name}</h3>
                        <p>Возраст: {user.age}</p>
                        <p>В браке: {user.isMarried ? 'Да' : 'Нет'}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App
