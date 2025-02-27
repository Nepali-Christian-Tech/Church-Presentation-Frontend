import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-control-slide-show',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './control-slide-show.component.html',
  styleUrl: './control-slide-show.component.scss'
})
export class ControlSlideShowComponent {
  lyrics = "\n\nVerse 1:\nमसीह-मसीहको लागि\nविश्\u200dवासीले लडाइँ गर्नुछ\nउनको क्रूसको झन्डा उठाई बोक्\u200d\u200cनुछ,\nmasih-masih-ko laagi\nvishwaasi-le laDaaiň garnu-cha\nun-ko krus-ko jhanDaa\nuThaa-i boknu-cha,\n\n\nजय पाउनुछ, उनले दिन्छन्\u200c\nजय पाउनुछ, अँ जरुर\nख्रीष्ट हुन्\u200c सबैका राजा\nनष्ट हुन्छन्\u200c सब शत्रु।\njai paaunu-cha, un-le dinchan\njai paaunu-cha, aň jarur\nkhrisT hun sabai-kaa raajaa\nnasTa hunchan sab shatru.\n\n\nVerse 2:\nयेशूको लागि\nविश्\u200dवासीले लडाइँ गर्नुछ\nसब ढाढस, बल र सामर्थ ख्रीष्टदेखि पाउनुछ\nyeshu-ko laagi\nvishwaasi-le laDaaiň garnu-cha\nsab DhaaDhasa, bal ra saamartha\nkhrisT-dekhi paaunu-cha\n\n\nन आफ्\u200d\u200cना बलले जित्\u200d\u200cनु\nन आफ्\u200d\u200cना हतियार\nअवश्य सबै लाऔं धर्म\nपुस्तकको अनुसार।\nna aafnaa bal-le jitnu,\nna aafnaa hati-yaara\nabashye sabai laauň dharma-\npustak-ko anusaar.\n\n\nVerse 3:\nयेशूको लागि\nविश्\u200dवासीले लडाइँ गर्नुछ\nयुद्ध गर्ने बेला कम्मर\nसत्यले बाँध्\u200d\u200cनुछ\nyeshu-ko laagi\nvishwaasi-le laDaaiň garnu-cha\nyuddha garne belaa kammar\nsatye-le baaňdhnu-cha\n\n\nविश्\u200dवासको ढाल लगाऔं\nर तरवार आत्माको\nसुसमाचारका जुत्ता\nर कवच धर्मको।\nvishwaas-ko Dhaala lagaauň\nra tar'waar aatmaa-ko\nsu-samaacaar-kaa juttaa\nra kawac dharma-ko.\n\n\nVerse 4:\nयेशूको लागि\nविश्\u200dवासीले लडाइँ गर्नुछ\nआज लडाइँ गर्नुछ\nभोलि जय पाउनुछ\nyeshu-ko laagi\nvishwaasi-le laDaaiň garnu-cha\naaja laDaaiň garnu-cha,\nbholi jai paaunu-cha\n\n\nदिइन्छ स्वर्गे मुकुट\nविजयी सबैलाई\nर स्वर्गमा सधैँ बस्\u200d\u200cनुछ\nविजयको गीत गाउँदै।\ndi-incha sworge mukuT\nbijayi sabai-laai\nra sworga-maa sadhaiň basnu-cha\nbijai-ko git gaauň-dai.";

  lyricArray: string[] = [];

  constructor() {
    this.lyricArray = this.lyrics.split(/\n\n\n+/).map(section => section.trim());

    console.log(this.lyricArray);
  }
}
