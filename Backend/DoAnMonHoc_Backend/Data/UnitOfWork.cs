using AutoMapper;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using DoAnMonHoc_Backend.Repository;
using Microsoft.AspNetCore.Identity;

namespace DoAnMonHoc_Backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CSDLContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public UnitOfWork(CSDLContext context, 
            UserManager<User> userManager, RoleManager<IdentityRole> roleManager,
            IConfiguration configuration, IMapper mapper, IEmailService emailService)
        {
            this._context = context;
            this._userManager = userManager;
            this._roleManager = roleManager;
            _configuration = configuration;
            this._mapper = mapper;
            _emailService = emailService;
        }
        public IUserRepositoty UserRepositoty =>
                new UserRepository(_context, _userManager, 
                    _roleManager, _configuration,_mapper, _emailService);

        public IProductTypeRepository ProductTypeRepository =>
            new ProductTypeRepository(_context);
        public IBrandRepository BrandRepository =>
            new BrandRepository(_context);

        public IColorRepository ColorRepository => 
            new ColorRepository(_context);

        public ICapacityRepository CapacityRepository =>
            new CapacityRepository(_context);

        public IPhoneRepository PhoneRepository => 
            new PhoneRepository(_context, _mapper);

        public IProductTypeDetailRepository ProductTypeDetailRepository => 
            new productTypeDetailRepository(_context);

        public IProductRepository ProductRepository => 
            new ProductRepository(_context, _mapper);

        public IWishlistRepository WishlistRepository => 
            new WishlistRepository(_context);

        public ICouponRepository CouponRepository => 
            new CouponRepository(_context);

        public IInvoiceRepository InvoiceRepository => 
            new InvoiceRepository(_context);

        public IInvoiceDetailRepository InvoiceDetailRepository => 
            new InvoiceDetailRepository(_context);

        public ICommentRepository CommentRepository => 
            new CommentRepository(_context);

        public IRatingRepository RatingRepository => 
            new RatingRepository(_context);

        public ISlideshowRepository SlideshowRepository => 
            new SlideshowRepository(_context);

        public ICartRepository CartRepository => 
            new CartRepository(_context);

        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
