import type { User } from '../../../entities/user/model/types';

interface UsersStatsProps {
  users: User[];
  filteredCount: number;
}

export const UsersStats = ({ users, filteredCount }: UsersStatsProps) => {
  const totalUsers = users.length;
  const marriedUsers = users.filter(user => user.isMarried).length;
  const singleUsers = totalUsers - marriedUsers;
  
  const averageAge = totalUsers > 0 
    ? Math.round(users.reduce((sum, user) => sum + user.age, 0) / totalUsers)
    : 0;

  const marriedPercentage = totalUsers > 0 ? Math.round((marriedUsers / totalUsers) * 100) : 0;
  const singlePercentage = totalUsers > 0 ? Math.round((singleUsers / totalUsers) * 100) : 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">📊</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Статистика</h3>
          <p className="text-gray-500 text-xs">Обзор данных о пользователях</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center border border-blue-200">
          <div className="text-lg font-bold text-blue-600 mb-1">{totalUsers}</div>
          <div className="text-xs text-blue-700 font-medium">Всего</div>
          <div className="w-6 h-1 bg-blue-500 rounded-full mx-auto mt-1"></div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center border border-green-200">
          <div className="text-lg font-bold text-green-600 mb-1">{filteredCount}</div>
          <div className="text-xs text-green-700 font-medium">Показано</div>
          <div className="w-6 h-1 bg-green-500 rounded-full mx-auto mt-1"></div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center border border-purple-200">
          <div className="text-lg font-bold text-purple-600 mb-1">{averageAge}</div>
          <div className="text-xs text-purple-700 font-medium">Средний возраст</div>
          <div className="w-6 h-1 bg-purple-500 rounded-full mx-auto mt-1"></div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 text-center border border-orange-200">
          <div className="text-lg font-bold text-orange-600 mb-1">{marriedUsers}</div>
          <div className="text-xs text-orange-700 font-medium">В браке</div>
          <div className="w-6 h-1 bg-orange-500 rounded-full mx-auto mt-1"></div>
        </div>
      </div>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 border border-green-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            <span className="mr-2">💍</span>
            Семейное положение
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">В браке</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${marriedPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-gray-800">{marriedPercentage}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Не в браке</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-yellow-500 h-1.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${singlePercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-gray-800">{singlePercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
            <span className="mr-2">📈</span>
            Возрастные группы
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Молодые (18-30):</span>
              <span className="font-semibold text-blue-600">
                {users.filter(u => u.age >= 18 && u.age <= 30).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Взрослые (31-50):</span>
              <span className="font-semibold text-green-600">
                {users.filter(u => u.age >= 31 && u.age <= 50).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Старшие (50+):</span>
              <span className="font-semibold text-purple-600">
                {users.filter(u => u.age > 50).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 