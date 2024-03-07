﻿using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DoAnMonHoc_Backend.Interfaces;
using System.Net;

namespace DoAnMonHoc_Backend.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary cloudinary;
        public PhotoService(IConfiguration config)
        {
            Account account = new Account(
                config.GetSection("CloudinarySetting:CloudName").Value,
                config.GetSection("CloudinarySetting:API_Key").Value,
                config.GetSection("CloudinarySetting:API_Secret").Value);

            cloudinary = new Cloudinary(account);
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result;
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo)
        {
            var uploadResult = new ImageUploadResult();
            if(photo.Length > 0)
            {
                Console.WriteLine("Co the Upload");
                using var stream = photo.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(photo.FileName,stream),
                    Transformation = new Transformation()
                            .Height(500).Width(800)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            else
            {
                Console.WriteLine("No photo to upload.");
                Console.WriteLine(uploadResult.Error);
            }
            return uploadResult;
        }
    }
}
