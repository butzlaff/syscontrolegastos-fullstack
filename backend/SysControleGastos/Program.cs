using Microsoft.EntityFrameworkCore;
using SysControleGastos.Application.UseCases.Categories.GetAll;
using SysControleGastos.Application.UseCases.Categories.Register;
using SysControleGastos.Application.UseCases.Persons.Delete;
using SysControleGastos.Application.UseCases.Persons.GetAll;
using SysControleGastos.Application.UseCases.Persons.Register;
using SysControleGastos.Application.UseCases.Reports.GetCategoriesBalance;
using SysControleGastos.Application.UseCases.Reports.GetPersonsBalance;
using SysControleGastos.Application.UseCases.Transactions.GetAll;
using SysControleGastos.Application.UseCases.Transactions.Register;
using SysControleGastos.Filters;
using SysControleGastos.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMvc(config => config.Filters.Add(typeof(ExceptionFilter)));

builder.Services.AddScoped<RegisterPersonUseCase>();
builder.Services.AddScoped<RegisterCategoryUseCase>();
builder.Services.AddScoped<DeletePersonUseCase>();
builder.Services.AddScoped<GetAllPersonsUseCase>();
builder.Services.AddScoped<GetAllCategoryUseCase>();
builder.Services.AddScoped<GetAllTransactionUseCase>();
builder.Services.AddScoped<RegisterTransactionUseCase>();
builder.Services.AddScoped<GetPersonsBalanceUseCase>();
builder.Services.AddScoped<GetCategoriesBalanceUseCase>();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });


var connectionString = builder.Configuration.GetConnectionString("Default");

var dbPath = Path.Combine(
    builder.Environment.ContentRootPath,
    "Infrastructure",
    "Database",
    "syscontrol.db"
);

// Garanto que a pasta do banco exista
var directory = Path.GetDirectoryName(dbPath);
if (!Directory.Exists(directory))
{
    Directory.CreateDirectory(directory!);
}

// Substitui o Data Source relativo por absoluto
builder.Services.AddDbContext<SCGContext>(options =>
    options.UseSqlite($"Data Source={dbPath}")
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
