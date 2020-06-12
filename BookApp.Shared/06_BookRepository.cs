using Dul.Articles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookApp.Shared
{
    /// <summary>
    /// [6] Repository Class: ADO.NET or Dapper or Entity Framework Core
    /// ~Repository, ~Provider, ~Data
    /// </summary>
    public class BookRepository : IBookRepository
    {
        private readonly BookAppDbContext _context;
        private readonly ILogger _logger;

        public BookRepository(BookAppDbContext context, ILoggerFactory loggerFactory)
        {
            this._context = context;
            this._logger = loggerFactory.CreateLogger(nameof(BookRepository));
        }

        #region [6][1] 입력: AddAsync
        //[6][1] 입력
        public async Task<Book> AddAsync(Book model)
        {
            try
            {
                _context.Books.Add(model);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _logger?.LogError($"ERROR({nameof(AddAsync)}): {e.Message}");
            }

            return model;
        }
        #endregion

        #region [6][2] 출력: GetAllAsync
        //[6][2] 출력
        public async Task<List<Book>> GetAllAsync()
        {
            // 학습 목적으로... InMemory 데이터베이스에선 사용 금지 
            //return await _context.Books.FromSqlRaw<Book>("Select * From dbo.Books Order By Id Desc") 
            return await _context.Books.OrderByDescending(m => m.Id)
                //.Include(m => m.BooksLinks)
                .ToListAsync();
        }
        #endregion

        #region //[6][3] 상세: GetByIdAsync
        //[6][3] 상세
        public async Task<Book> GetByIdAsync(int id)
        {
            var model = await _context.Books
                //.Include(m => m.BooksLinks)
                .SingleOrDefaultAsync(m => m.Id == id);

            return model;
        }
        #endregion

        #region //[6][4] 수정: UpdateAsync
        //[6][4] 수정
        public async Task<bool> UpdateAsync(Book model)
        {
            try
            {
                _context.Update(model);
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception e)
            {
                _logger?.LogError($"ERROR({nameof(UpdateAsync)}): {e.Message}");
            }

            return false;
        }
        #endregion

        #region //[6][5] 삭제: DeleteAsync
        //[6][5] 삭제
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var model = await _context.Books.FindAsync(id);
                _context.Remove(model);
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception e)
            {
                _logger?.LogError($"ERROR({nameof(DeleteAsync)}): {e.Message}");
            }

            return false;
        }
        #endregion

        #region [6][6] 필터링: GetArticlesAsync
        //[6][6] 필터링
        public Task<ArticleSet<Book, int>> GetArticlesAsync<TParentIdentifier>(int pageIndex, int pageSize, string searchField, string searchQuery, string sortOrder, TParentIdentifier parentIdentifier)
        {
            throw new NotImplementedException();
        }
        #endregion    
    }
}
