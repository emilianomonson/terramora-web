package com.terramora.backend.controller;

import com.terramora.backend.service.ImageUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class ImageUploadController {

    private final ImageUploadService imageUploadService;

    @PostMapping("/images")
    public Map<String, List<String>> uploadImages(
            @RequestParam("files") List<MultipartFile> files
    ) {
        List<String> imageUrls = imageUploadService.uploadImages(files);

        return Map.of("urls", imageUrls);
    }
}