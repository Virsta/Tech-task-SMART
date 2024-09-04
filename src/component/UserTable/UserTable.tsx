import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setFilter } from '../../redux/actions';
import { User } from '../../types/User';
import { RootState } from '../../redux/store';
import './UserTable.scss';

const UserTable: React.FC = () => {
  const dispatch = useDispatch();
  const { users, filters } = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
      dispatch(setUsers(data));
    };

    fetchUsers();
  }, [dispatch]);

  const handleFilterChange = (field: string, value: string) => {
    dispatch(setFilter(field, value));
  };

  const filteredUsers = users.filter((user) =>
    Object.keys(filters).every((key) =>
      user[key as keyof User].toString().toLowerCase().includes(filters[key as keyof typeof filters].toLowerCase())
    )
  );

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by username"
          value={filters.username}
          onChange={(e) => handleFilterChange('username', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange('phone', e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;