import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { TestDataVisualizerComponent } from "@funk/test/infrastructure/external/data-visualizer/component"

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: TestDataVisualizerComponent,
      },
    ]),
  ],
  declarations: [TestDataVisualizerComponent],
})
export class TestDataVisualizerModule {}
