//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

[assembly: global::Xamarin.Forms.Xaml.XamlResourceIdAttribute("Xamarin.Demo.Droid.MainPage.xaml", "MainPage.xaml", typeof(global::Xamarin.Demo.MainPage))]

namespace Xamarin.Demo {
    
    
    [global::Xamarin.Forms.Xaml.XamlFilePathAttribute("D:\\OProjects\\Xamarin.Demo\\Xamarin.Demo\\Xamarin.Demo\\Xamarin.Demo\\Xamarin.Demo\\Mai" +
        "nPage.xaml")]
    public partial class MainPage : global::Xamarin.Forms.ContentPage {
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Xamarin.Forms.Build.Tasks.XamlG", "2.0.0.0")]
        private global::Xamarin.Forms.Entry url;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Xamarin.Forms.Build.Tasks.XamlG", "2.0.0.0")]
        private global::Xamarin.Forms.WebView webView;
        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Xamarin.Forms.Build.Tasks.XamlG", "2.0.0.0")]
        private void InitializeComponent() {
            global::Xamarin.Forms.Xaml.Extensions.LoadFromXaml(this, typeof(MainPage));
            url = global::Xamarin.Forms.NameScopeExtensions.FindByName<global::Xamarin.Forms.Entry>(this, "url");
            webView = global::Xamarin.Forms.NameScopeExtensions.FindByName<global::Xamarin.Forms.WebView>(this, "webView");
        }
    }
}
