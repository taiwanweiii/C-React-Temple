using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Server.Model.Dto
{
    public class ApiResponse<T>
    {
        [RegularExpression("success|fail", ErrorMessage = "Status 必須是 success 或 fail")]
        public required string Status { get; set; }   // "success" 或 "fail"
        public string? Message { get; set; }  // 顯示給前端的訊息
        public T? Data { get; set; }          // 可放錯誤細節或結果
    }
}