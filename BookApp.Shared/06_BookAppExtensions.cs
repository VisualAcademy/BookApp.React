using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.Shared
{
    /// <summary>
    /// BookApp 관련 의존성(종속성) 주입 관련 코드만 따로 모아서 관리 
    /// </summary>
    public static class BookAppExtensions
    {
        public static void AddDependencyInjectionContainerForBookApp(this IServiceCollection services, IConfiguration configuration)
        {
            // BookAppDbContext.cs Inject: New DbContext Add
            services.AddDbContext<BookAppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);

            // IBookRepository.cs Inject: DI Container에 서비스(리포지토리) 등록 
            services.AddTransient<IBookRepository, BookRepository>();
        }
        public static void AddDependencyInjectionContainerForBookApp(this IServiceCollection services, string connectionString)
        {
            // BookAppDbContext.cs Inject: New DbContext Add
            services.AddDbContext<BookAppDbContext>(options =>
                options.UseSqlServer(connectionString), ServiceLifetime.Transient);

            // IBookRepository.cs Inject: DI Container에 서비스(리포지토리) 등록 
            services.AddTransient<IBookRepository, BookRepository>();
        }
    }
}
