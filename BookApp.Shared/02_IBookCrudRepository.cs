using Dul.Articles;

namespace BookApp.Shared
{
    //public interface ICrudRepositoryBase<T, TIdentifier>
    //{
    //    Task<T> AddAsync(T model); // 입력
    //    Task<List<T>> GetAllAsync(); // 출력
    //    Task<T> GetByIdAsync(TIdentifier id); // 상세
    //    Task<bool> UpdateAsync(T model); // 수정
    //    Task<bool> DeleteAsync(TIdentifier id); // 삭제
    //}

    /// <summary>
    /// [3] Generic Repository Interface => ICrudRepositoryBase.cs 
    /// </summary>
    public interface IBookCrudRepository<T> : ICrudRepositoryBase<T, int>
    {
        // PM> Install-Package Dul
        // Empty
    }
}
