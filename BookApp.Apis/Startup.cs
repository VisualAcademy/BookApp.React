using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookApp.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BookApp.Apis
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // BookApp 관련 의존성(종속성) 주입 관련 코드만 따로 모아서 관리 
            AddDependencyInjectionContainerForBookApp(services);

            #region CORS
            //[CORS][1] CORS 사용 등록
            //[CORS][1][1] 기본: 모두 허용
            services.AddCors(options =>
            {
                //[A] [EnableCors] 특성으로 적용 가능 
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
                //[B] [EnableCors("AllowAnyOrigin")] 형태로 적용 가능
                options.AddPolicy("AllowAnyOrigin", builder =>
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            #endregion
        }

        /// <summary>
        /// BookApp 관련 의존성(종속성) 주입 관련 코드만 따로 모아서 관리 
        /// </summary>
        private void AddDependencyInjectionContainerForBookApp(IServiceCollection services)
        {
            // BookAppDbContext.cs Inject: New DbContext Add
            services.AddEntityFrameworkSqlServer().AddDbContext<BookAppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // IBookRepository.cs Inject: DI Container에 서비스(리포지토리) 등록 
            services.AddTransient<IBookRepository, BookRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
