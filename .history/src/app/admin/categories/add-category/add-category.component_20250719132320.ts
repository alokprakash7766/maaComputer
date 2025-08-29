submitCategory() {
  if (this.categoryForm.invalid || !this.selectedFile) {
    this.toastr.error('Please fill all required fields and select an image.');
    return;
  }

  this.spinner.show();

  this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
    next: (res: any) => {
      const category: Category = {
        ...this.categoryForm.value,
        imageUrl: res.secure_url,            // ✅ Use Cloudinary image URL here
        createdAt: serverTimestamp()
      };

      this.categoryService.addCategory(category)
        .then(() => {
          this.spinner.hide();
          this.toastr.success('Category saved in Firebase!');
          this.categoryForm.reset();
          this.selectedFile = null;
        })
        .catch((error) => {
          this.spinner.hide();
          this.toastr.error('Error saving category!');
          console.error(error);
        });
    },
    error: (err: any) => {
      this.spinner.hide();
      this.toastr.error("Something went wrong during image upload");
      console.error(err);
    }
  });
}
