namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepositoty UserRepositoty { get; }
        IProductTypeRepository ProductTypeRepository { get; }
        IBrandRepository BrandRepository { get; }
        IColorRepository ColorRepository { get; }
        ICapacityRepository CapacityRepository { get; }
        IPhoneRepository PhoneRepository { get; }
        IProductTypeDetailRepository ProductTypeDetailRepository { get; }
        IProductRepository ProductRepository { get; }
        IWishlistRepository WishlistRepository { get; }
        ICouponRepository CouponRepository { get; }
        IInvoiceRepository InvoiceRepository { get; }
        IInvoiceDetailRepository InvoiceDetailRepository { get; }
        ICommentRepository CommentRepository { get; }
        IRatingRepository RatingRepository { get; }
        ISlideshowRepository SlideshowRepository { get; }
        ICartRepository CartRepository { get; }
        Task<bool> SaveAsync();
    }
}
