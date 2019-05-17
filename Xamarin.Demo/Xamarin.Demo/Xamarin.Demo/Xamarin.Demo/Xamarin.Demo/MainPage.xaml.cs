using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Xamarin.Demo
{
	public partial class MainPage : ContentPage
	{
		public MainPage()
		{
			InitializeComponent();
            webView.Source = "http://192.168.168.14:481/";
		}

        private void OnBackButtonClicked(object sender, EventArgs e)
        { 
            webView.GoBack();
        }

        private void OnForwardButtonClicked(object sender, EventArgs e)
        {
            webView.GoForward();
        }
        private void OnGoButtonClicked(object sender,EventArgs e)
        {
            webView.Source = url.Text;
        }
    }
}
