using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Helpers;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using DoAnMonHoc_Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddDbContext<CSDLContext>(options =>
    options.
    UseSqlServer(builder.Configuration.GetConnectionString("DoAnMonHoc")
    ?? throw new InvalidOperationException("Connection string 'DoAnMonHoc' not found.")));

builder.Services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<CSDLContext>()
                .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                                .GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

builder.Services.AddControllers()
    .AddNewtonsoftJson(options => 
    options.SerializerSettings.ReferenceLoopHandling 
    = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
StripeConfiguration.ApiKey = builder.Configuration["StripeSetting:SecretKey"];
builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
