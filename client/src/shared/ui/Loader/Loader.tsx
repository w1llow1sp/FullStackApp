export const Loader = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative">
        {/* Основной спиннер */}
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Центральная точка */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Внешние точки */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute -top-2 -left-2 w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  );
}; 